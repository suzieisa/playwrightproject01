
import {test, expect} from '../../fixtures/page-object-fixtures'
import { TodoPage } from '../../pages/TodoPage'



test.describe('Todo Tests', async () => {
    let todoPage: TodoPage
    
    test.beforeEach(async({page}) => {
        await page.goto('/frontend/project-6')
        todoPage = new TodoPage(page)

    })
    const items = ['item1', 'item2', 'item3', 'item4', 'item5']

    test('Test Case 01', async () =>  {
        await expect(todoPage.modal).toBeVisible()
        await expect(todoPage.modalHeader).toHaveText('My Tasks')
        await expect(todoPage.inputBox).toBeEnabled()
        await expect(todoPage.addButton).toBeEnabled()
        await expect(todoPage.searchField).toBeEnabled()
        await expect(todoPage.emptyTask).toHaveText('No task found!')

     })

     test('Test Case 02', async ({ todoPage }) =>  {
        await todoPage.addTodo('item1')
        await expect(todoPage.itemList).toContainText('item1')
        await expect(todoPage.itemList).toBeVisible()
        await expect(todoPage.itemList).toHaveCount(1)
        await todoPage.itemList.click()
        await expect(todoPage.itemList).toHaveAttribute('style', 'text-decoration: line-through;')
        await todoPage.remove('item1')
        await todoPage.inputBox.clear()
        await expect(todoPage.emptyTask).toHaveText('No task found!')
     })

     test('Test Case 03', async ({ todoPage }) => {
        const items = ['item1', 'item2', 'item3', 'item4', 'item5']
        
        
        for(let i = 0; i < items.length; i++) {
           await todoPage.addTodo(items[i])
 
           
        }
        await expect(todoPage.itemList).toHaveText(items)

        for (let i = 0; i < await todoPage.itemList.count(); i++) {
            await todoPage.itemList.nth(i).click();
          }

          await todoPage.clear.click()
          await todoPage.inputBox.clear()
          await expect(todoPage.emptyTask).toHaveText('No task found!')

     })
     test('Test Case 04', async ({ todoPage }) => {
        
        for(let i = 0; i < items.length; i++) {
           await todoPage.addTodo(items[i])
 
           
        }
        await expect(todoPage.itemList).toHaveText(items)
        await todoPage.searchField.fill('item1')
        await expect(todoPage.todoItem).toHaveText('item1')
        await expect(todoPage.todoItem).toHaveCount(1)
})
    test('Test Case 05', async ({ todoPage }) => {

        const text = 'item1'

        await todoPage.inputBox.fill(text)
        await expect(todoPage.emptyTask).toHaveText('No task found!')
        await todoPage.addTodo('charactersmorethanthirtyyyyyyyyyy')
        await expect(todoPage.errorMessage).toHaveText("Error: Todo cannot be more than 30 characters!")
        await todoPage.addTodo(text)
        await expect(todoPage.itemList).toHaveCount(1)
        await todoPage.addTodo(text)
        await  expect(todoPage.errorMessage).toContainText(`Error: You already have ${text} in your todo list.`)

})
})