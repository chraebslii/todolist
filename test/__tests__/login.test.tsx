import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "@pages/auth/login";

describe("Login page", () => {
	describe("UI", () => {
		it("renders header", () => {
			render(<Login />);

			const header = screen.getAllByText(/Todolist/i);

			for (const h of header) {
				expect(h).toBeInTheDocument();
			}
		});
		it("renders footer", () => {
			render(<Login />);

			const footer = screen.getByText(/chraebsli IT-Services/i);

			expect(footer).toBeInTheDocument();
		});
		it("renders welcome", () => {
			render(<Login />);

			const main = screen.getByText(/Login/i);

			expect(main).toBeInTheDocument();
		});
	});
});
