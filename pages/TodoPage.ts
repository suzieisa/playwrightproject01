import { type Locator, type Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class TodoPage extends BasePage {
  readonly inputBox: Locator
  readonly todoItem: Locator
  readonly modal: Locator
  readonly modalHeader: Locator
  readonly addButton: Locator
  readonly searchField: Locator 
  readonly emptyTask: Locator
  readonly itemList: Locator
  readonly clear: Locator
  readonly errorMessage: Locator


  constructor(page: Page) {
    super(page)
    this.inputBox = page.locator('#input-add')
    this.todoItem = page.locator('.todo-item:not(.has-text-danger)')
    this.modal = page.locator('.panel')
    this.modalHeader = page.locator('.panel-heading')
    this.addButton = page.locator('#add-btn')
    this.searchField = page.locator('#search')
    this.emptyTask = page.locator('.has-text-danger')
    this.itemList = page.locator('.mr-auto')
    this.clear = page.locator('#clear')
    this.errorMessage = page.locator('.is-danger')
  }

  async goto() {
    await this.page.goto('https://techglobal-training.com/frontend/project-6')
  }

  async addTodo(text: string) {
    await this.inputBox.fill(text)
    await this.inputBox.press('Enter')
  }

  async remove(text: string) {
    const todo = this.todoItem.filter({ hasText: text })
    await todo.hover()

    await todo.locator('.destroy').click()
  }

  }
