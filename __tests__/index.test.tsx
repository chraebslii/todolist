import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Index from "@pages/index";

describe("Index page", () => {
	describe("UI", () => {
		it("renders header", () => {
			render(<Index />);

			const header = screen.getAllByText(/Todolist/i);

			for (const h of header) {
				expect(h).toBeInTheDocument();
			}
		});
		it("renders footer", () => {
			render(<Index />);

			const footer = screen.getByText(/chraebsli IT-Services/i);

			expect(footer).toBeInTheDocument();
		});
		it("renders welcome", () => {
			render(<Index />);

			const main = screen.getByText(/Welcome to Todolist/i);

			expect(main).toBeInTheDocument();
		});
	});
});
