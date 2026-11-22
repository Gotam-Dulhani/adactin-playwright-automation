export async function handleAlert(page, action = 'accept') {
  let message = '';
  page.once('dialog', async (dialog) => {
    message = dialog.message();
    if (action === 'dismiss') {
      await dialog.dismiss();
    } else {
      await dialog.accept();
    }
  });
  return message;
}

export function autoHandleDialogs(page, action = 'accept') {
  page.on('dialog', async (dialog) => {
    if (action === 'dismiss') {
      await dialog.dismiss();
    } else {
      await dialog.accept();
    }
  });
}
