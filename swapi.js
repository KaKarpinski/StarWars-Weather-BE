import fetch from 'node-fetch';

const getAllChars = async (req, res) => {
  const url = 'https://swapi.dev/api/people';
  const tR = [];
  for (let i = 0; i < 9; i++) {
    let data = {};
    try {
      const response = await fetch(url + `/?page=${i + 1}`);
      data = await response.json();
    } catch (err) {
      res.status(404).send(err);
    }
    tR.push(data.results);
  }
  res.json(tR);
};

const getFiltered = async (req, res) => {
  const url = 'https://swapi.dev/api/people';
  const filters = req.body;
  let tR = [];

  for (let i = 0; i < 9; i++) {
    let data = {};
    try {
      const response = await fetch(url + `/?page=${i + 1}`);
      data = await response.json();
    } catch (err) {
      res.status(404).send(err);
    }
    tR.push(data.results);
  }

  tR = tR.reduce((acc, cv) => acc.concat(cv), []);
  tR = tR.filter(item => {
    for (var key in filters) {
      if (item[key] === undefined || item[key] != filters[key])
        return false;
    }
    return true;
  });

  res.json(tR);
};

export {getAllChars, getFiltered};
