import * as fs from "fs";
import * as path from "path";
import { filtersResponseInterface } from "./types/filtersResponse.interface";
import { Films } from "./types/filmResponse.interface";

export class FilmsService {
  lineStarts: number[] = [0];
  yearIndex: Record<string, number[]> = {};
  genreIndex: Record<string, Record<string, boolean>> = {};

  init(): void {
    const file: Buffer = fs.readFileSync(
      path.resolve(__dirname, "../data/data.csv")
    );

    let currPos: number = 0;
    while (true) {
      currPos = file.indexOf("\n", currPos + 1);
      if (currPos === -1) {
        break;
      }
      this.lineStarts.push(currPos);
    }

    for (let i = 2; i < this.lineStarts.length; i++) {
      const string = file.slice(
        this.lineStarts[i - 1] || 0,
        this.lineStarts[i]
      );
      const [id, name, genre1, genre2, year] = string.toString().split(", ");
      if (!this.yearIndex[year]) {
        this.yearIndex[year] = [];
      }
      if (!this.genreIndex[genre1]) {
        this.genreIndex[genre1] = {};
      }

      if (!this.genreIndex[genre2]) {
        this.genreIndex[genre2] = {};
      }

      this.yearIndex[year].push(i);
      this.genreIndex[genre1][i] = true;
      this.genreIndex[genre2][i] = true;
    }
  }

  async fetch(query: any): Promise<Films> {
    let resultItemIndexes: number[] = [];
    query.pageNumber = Number(query.pageNumber);
    query.pageSize = Number(query.pageSize);

    if (query.year || query.genre) {
      if (query.year) {
        const filteredYear = this.yearIndex[query.year] || [];
        if (!query.genre) {
          resultItemIndexes = filteredYear;
        } else {
          resultItemIndexes = filteredYear.filter(
            (i) => this.genreIndex[query.genre][i]
          );
        }
      } else if (query.genre) {
        resultItemIndexes =
          Object.keys(this.genreIndex[query.genre]).map((i) => Number(i)) || [];
      }

      resultItemIndexes = resultItemIndexes.slice(
        query.pageNumber * query.pageSize,
        (query.pageNumber + 1) * query.pageSize
      );
    } else {
      resultItemIndexes = Array.from(
        Array(query.pageSize),
        (v, index) => query.pageNumber * query.pageSize + index + 2
      );
    }

    let fd: fs.promises.FileHandle | undefined;
    try {
      const fd = await fs.promises.open(
        path.resolve(__dirname, "../data/data.csv")
      );

      return Promise.all(
        resultItemIndexes.map(async (index) => {
          const line = await this.fsRead(
            fd.fd,
            this.lineStarts[index - 1] || 0,
            this.lineStarts[index + 0] - (this.lineStarts[index - 1] || 0)
          );
          const [id, name, genre1, genre2, year] = line.toString().split(", ");
          return {
            id,
            name,
            genre1,
            genre2,
            year,
          };
        })
      );
    } finally {
      if (fd) {
        await fd.close();
      }
    }
  }

  async fsRead(fd: number, from: number, size: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.read(
        fd,
        Buffer.allocUnsafe(1000),
        0,
        size,
        from,
        (err, bytes, data) => {
          resolve(data.slice(1, bytes));
        }
      );
    });
  }

  getFilters(): filtersResponseInterface {
    return {
      genres: Object.keys(this.genreIndex),
      years: Object.keys(this.yearIndex),
    };
  }
}