import {addUser, createDB, createPool} from './db.js';

try {
  const pool = await createPool();
  const conn = await pool.getConnection();

  console.log('Creating DB...');
  await createDB(conn);
  console.log('Creating complete');
  await addUser(conn, 'kamilkarpinski.6@gmail.com', 'qwerty123');
  await addUser(conn, 'jankowalski@gmail.com', 'jankowalski123');
  pool.end();
} catch(err) {
  console.error(err.message);
}
