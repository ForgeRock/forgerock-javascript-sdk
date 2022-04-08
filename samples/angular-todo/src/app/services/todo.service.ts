/*
 * angular-todo-prototype
 *
 * todo.service.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Injectable } from '@angular/core';
import { Todo } from '../features/todo/todo';
import { environment } from '../../environments/environment';
import { HttpClient } from '@forgerock/javascript-sdk';

/**
 * Used to define interactions with the backend
 */
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  /**
   * Send a request to retrieve all Todos for the current user
   * @returns Promise - Response from the GET request
   */
  getTodos(): Promise<Response> {
    return this.request(`${environment.API_URL}/todos`, 'GET');
  }

  /**
   * Send a request to create a new Todo for the current user
   * @param todo - The Todo to be created
   * @returns Promise - Response from the POST request
   */
  createTodo(todo: Todo): Promise<Response> {
    return this.request(`${environment.API_URL}/todos`, 'POST', todo);
  }

  /**
   * Send a request to mark a given Todo as complete
   * @param todo - The Todo to be marked as completed
   * @returns Promise - Response from the POST request
   */
  completeTodo(todo: Todo): Promise<Response> {
    todo.completed = !todo.completed;
    return this.request(`${environment.API_URL}/todos/${todo._id}`, 'POST', todo);
  }

  /**
   * Send a request to update a given Todo
   * @param todo - The Todo to be updated
   * @returns Promise - Response from the POST request
   */
  updateTodo(todo: Todo): Promise<Response> {
    return this.request(`${environment.API_URL}/todos/${todo._id}`, 'POST', todo);
  }

  /**
   * Send a request to delete a given Todo
   * @param todo - The Todo to be deleted
   * @returns Promise - Response from the DELETE request
   */
  deleteTodo(todo: Todo): Promise<Response> {
    return this.request(`${environment.API_URL}/todos/${todo._id}`, 'DELETE');
  }

  /**
   * Send a request using the ForgeRock JS SDK Http Client
   * @param resource - The url for the request
   * @param method - The method for the request
   * @param data - The body for the request
   * @returns Response from the request
   */
  request(resource: string, method: string, data?: Todo): Promise<Response> {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: HttpClient for protected resource server requests.
     * ------------------------------------------------------------------------
     * Details: This helper retrieves your access token from storage and adds
     * it to the authorization header as a bearer token for making HTTP
     * requests to protected resource APIs. It's a wrapper around the native
     * fetch method.
     *********************************************************************** */
    return HttpClient.request({
      url: resource,
      init: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        method: method,
      },
      timeout: 5000,
    });
  }
}
