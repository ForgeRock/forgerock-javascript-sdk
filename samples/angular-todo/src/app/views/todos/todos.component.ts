/*
 * angular-todo-prototype
 *
 * todos.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, OnInit } from '@angular/core';
import { Todo } from '../../features/todo/todo';
import { TodoService } from '../../services/todo.service';

/**
 * Used to display a page to list Todos and allow the user to interact with them
 */
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  /**
   * The existing Todos
   */
  todos: Todo[] = [];

  /**
   * A new, empty Todo to be filled in by the user and submitted
   */
  newTodo: Todo = { _id: '', title: '', completed: false };

  /**
   * A Todo marked for editing
   */
  editTodo?: Todo;

  /**
   * A Todo marked for deletion
   */
  deleteTodo?: Todo;

  /**
   * Initialise with the shared Todo service
   * @param todoService - The shared Todo service
   */
  constructor(private todoService: TodoService) {}

  /**
   * Retrieve Todos on load
   */
  ngOnInit(): void {
    this.getTodos();
  }

  /**
   * Marks a given Todo to be edited using a modal
   * @param todo - The Todo to be edited
   */
  setEditTodo(todo: Todo): void {
    this.editTodo = todo;
  }

  /**
   * Marks a given Todo to be confirmed for deletion using a modal
   * @param todo - The Todo to be deleted
   */
  setDeleteTodo(todo: Todo): void {
    this.deleteTodo = todo;
  }

  /**
   * Reset all Todos and edits/deletes on the page
   */
  resetTodos(): void {
    this.editTodo = undefined;
    this.deleteTodo = undefined;
    this.newTodo = { _id: '', title: '', completed: false };
    this.getTodos();
  }

  /**
   * Retrieve Todos
   */
  async getTodos(): Promise<void> {
    try {
      let todos = await this.todoService.getTodos();
      let json = await todos.json();
      this.todos = json as Todo[];
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Submit a Todo to be created on the backend
   * @param todo - The Todo to be submitted for creation
   */
  async create(todo: Todo): Promise<void> {
    try {
      await this.todoService.createTodo(todo);
      this.resetTodos();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Submit a Todo to be marked as complete on the backend
   * @param todo - The Todo to be submitted as complete
   */
  async complete(todo: Todo): Promise<void> {
    try {
      await this.todoService.completeTodo(todo);
      this.resetTodos();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Submit a Todo to be updated
   * @param todo - The updated Todo to be submitted
   */
  async update(todo: Todo): Promise<void> {
    try {
      await this.todoService.updateTodo(todo);
      this.resetTodos();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Submit a Todo to be deleted on the backend
   * @param todo - The Todo to be submitted for deletion
   */
  async delete(todo: Todo): Promise<void> {
    try {
      await this.todoService.deleteTodo(todo);
      this.resetTodos();
    } catch (err) {
      console.log(err);
    }
  }
}
