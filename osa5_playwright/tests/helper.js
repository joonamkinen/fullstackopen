const loginWith = async (page, username, password)  => {
    await page.getByTestId('username-input').fill(username)
    await page.getByTestId('password-input').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

const newBlog = async (page, title, author, url) => {
    const createButton = page.getByRole('button', { name: 'new blog' });
    await createButton.click();

    await page.getByTestId('title-input').fill(title);
    await page.getByTestId('author-input').fill(author);
    await page.getByTestId('url-input').fill(url);

    const saveButton = page.getByRole('button', { name: 'create' });
    await saveButton.click();
}
  
  export { loginWith, newBlog }