import db from "../config/db";
import { connectDB } from "../server";

jest.mock("../config/db"); // Simulate the db connection

describe("connectDB", () => {
  it("Should handle error connecting to the database", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValue(new Error("Unable to connect to the database"));
    const consoleSpy = jest.spyOn(console, "log");

    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Unable to connect to the database")
    );
  });
});