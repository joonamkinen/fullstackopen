const { test, expect, beforeEach, describe, } = require('@playwright/test')
const { loginWith, newBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        var response = await request.post('http://localhost:3003/api/test/reset')
        console.log(response.status())
        console.log(response.statusText())
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Joona Mäkinen',
                username: 'joonam',
                password: 'salasana'
            }
        })

        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Toinen Käyttäjä',
                username: 'toinen',
                password: 'password'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const username = page.getByTestId('username-input')
        const password = page.getByTestId('password-input')
        const loginButton = page.getByRole('button', { name: 'login' })

        await expect(username).toBeVisible()
        await expect(password).toBeVisible()
        await expect(loginButton).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'joonam', 'salasana')

            const logoutButton = page.getByRole('button', { name: 'logout' })
            await expect(logoutButton).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'joonam', 'vääräsalasana')

            const errorMessage = page.getByTestId('error')
            await expect(errorMessage).toBeVisible()
            await expect(errorMessage).toHaveText('wrong credentials');

            const loginButton = page.getByRole('button', { name: 'login' })
            await expect(loginButton).toBeVisible()
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'joonam', 'salasana')
        })

        test('a new blog can be created', async ({ page }) => {

            await newBlog(page, 'Testiblogi', 'Testiauthor', 'testiblogi.fi')

            const blogList = page.getByTestId('bloglist');
            await expect(blogList).toContainText('Testiblogi')
        })

        test('a blog can be liked', async ({ page }) => {
            await newBlog(page, 'Testiblogi', 'Testiauthor', 'testiblogi.fi')

            const showButton = page.getByRole('button', { name: 'show' })
            await showButton.click()

            const likeButton = page.getByRole('button', { name: 'like' })
            await likeButton.click()

            const likes = page.getByTestId('likes')
            await expect(likes).toContainText('1')
        })

        test('a blog can be deleted', async ({ page }) => {
            await newBlog(page, 'Testiblogi', 'Testiauthor', 'testiblogi.fi')

            const showButton = page.getByRole('button', { name: 'show' });
            await showButton.click()

            page.on('dialog', async (dialog) => {
                expect(dialog.type()).toBe('confirm')
                expect(dialog.message()).toBe('Remove blog "Testiblogi" by Testiauthor?')
                await dialog.accept()
            });

            const deleteButton = page.getByRole('button', { name: 'delete' })
            await deleteButton.click()

            const blogList = page.getByTestId('bloglist');
            await expect(blogList).not.toContainText('Testiblogi');
        })
        test('only blog owner can see delete button', async ({ page }) => {
            await newBlog(page, 'Testiblogi', 'Testiauthor', 'testiblogi.fi')

            const logoutButton = page.getByRole('button', { name: 'logout' })
            await logoutButton.click()

            await loginWith(page, 'toinen', 'password')

            const showButton = page.getByRole('button', { name: 'show' });
            await showButton.click()

            const deleteButton = page.getByRole('button', { name: 'delete' })
            await expect(deleteButton).not.toBeVisible()
        })
    })
})