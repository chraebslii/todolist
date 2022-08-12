import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../src/pages/app";

describe("App page", () => {
	beforeEach(() => {
		fetchMock.doMock();
	});

	describe("UI", () => {
		it("renders header", () => {
			render(<App />);

			const header = screen.getAllByText(/Todolist/i);

			for (const h of header) {
				expect(h).toBeInTheDocument();
			}
		});
		it("renders footer", () => {
			render(<App />);

			const footer = screen.getByText(/chraebsli IT-Services/i);

			expect(footer).toBeInTheDocument();
		});
	});
	describe("Functionality", () => {
		it("", () => {});
	});
});
