import { App } from "../App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

describe("TodoApp", () => {
  it("renders app", () => {
    const app = render(<App />);
    expect(app).not.toBeUndefined();
  });

  it("renders initial items", () => {
    render(<App />);

    expect(screen.getByText("Buy milk")).toBeDefined();
    const buyMilkTodo = screen.getByTestId("toggle0");
    expect(buyMilkTodo).toBeChecked();

    expect(screen.getByText("Buy bread")).toBeDefined();
    const buyBreadTodo = screen.getByTestId("toggle1");
    expect(buyBreadTodo).not.toBeChecked();
  });

  it("verifies check logic", () => {
    render(<App />);

    const buyMilkTodo = screen.getByTestId("toggle0");
    userEvent.click(buyMilkTodo);
    expect(buyMilkTodo).not.toBeChecked();

    const buyBreadTodo = screen.getByTestId("toggle1");
    userEvent.click(buyBreadTodo);
    expect(buyBreadTodo).toBeChecked();
  });

  it("delete first item", () => {
    render(<App />);

    const buyMilkDelete = screen.getByTestId("delete0");
    userEvent.click(buyMilkDelete);
    expect(screen.queryByText("Buy milk")).toBeNull();
  });

  it("adds buy tomato", () => {
    render(<App />);

    const addInput = screen.getByTestId("add-input");
    userEvent.type(addInput, "Buy tomato");
    const addButton = screen.getByTestId("add-button");
    userEvent.click(addButton);

    expect(screen.getByText("Buy tomato")).toBeDefined();
    const buyBreadTodo = screen.getByTestId("toggle2");
    expect(buyBreadTodo).not.toBeChecked();
  });

  it("edit buy bread", () => {
    render(<App />);

    const buyBreadEditButton = screen.getByTestId("edit-button1");
    userEvent.click(buyBreadEditButton);

    const editInput = screen.getByTestId("edit-input1");
    userEvent.type(editInput, " 2");

    const buyBreadSaveButton = screen.getByTestId("save1");
    userEvent.click(buyBreadSaveButton);

    expect(screen.getByText("Buy bread 2")).toBeDefined();
  });
});
