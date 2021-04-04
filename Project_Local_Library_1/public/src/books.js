function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}
function partitionBooksByBorrowedStatus(books) {
  
  // create array of non-returned books
   const getNonReturnedBooks = (books) => {
    return books.filter((book) => book.borrows.some((transaction) => !transaction.returned));
  };
  const getReturnedBooks = (books) => {
    return books.filter((book) => book.borrows.every((transaction) => transaction.returned));
  };
  const nonReturnedBooks = getNonReturnedBooks(books);
  // create array of returned books
  const returnedBooks = getReturnedBooks(books);
  // create empty array
  const result = [];
  // push non-returned books array
  result.push(nonReturnedBooks);
  // push returned books array
  result.push(returnedBooks);
  // return array
  return result;
}

function getBorrowersForBook(book, accounts,id) {

  // create array of transactons from the given book
  const transactions = book.borrows;
  // use map to add the transaction id's account info to the transaction
  
  const result = transactions.map((transaction) => {
    const accountInfo = findAccountById(accounts, transaction.id);
    const newTransaction = {
      ...transaction,
      ...accountInfo,
    };
    return newTransaction;
  });

  // limit the amount of transactions to 10
  result.splice(10);
  // return the updated transaciton array
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
