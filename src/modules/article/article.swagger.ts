export const createArticle = {
  success: true,
  data: {
    id: 'db8a1bc1-dbc8-49af-8f53-37da0f6fd636',
    title: 'new article',
    description: 'this is new article.',
    imgUrl:
      'http://localhost:3000/uploads/black-pant-eea9832fff278afb97b6e3ea83b9b4010.jpg',
  },
  message: 'Request successfully executed!!',
};

export const updateArticle = {
  success: true,
  data: {
    id: 'db8a1bc1-dbc8-49af-8f53-37da0f6fd636',
    title: 'new article updated',
    description: 'this is new article updated.',
    imgUrl:
      'http://localhost:3000/uploads/black-pant-eea9832fff278afb97b6e3ea83b9b4010.jpg',
  },
  message: 'Request successfully executed!!',
};

export const deleteArticle = updateArticle;

export const viewArticles = {
  success: true,
  data: [
    {
      id: '9875976b-2451-4724-a209-a959b6767130',
      title: 'new article',
      description: 'this is new article.',
      imgUrl:
        'http://localhost:3000/uploads/black-pant-eea9832fff278afb97b6e3ea83b9b4010.jpg',
    },
  ],
  message: 'Request successfully executed!!',
};
export const viewArticle = {
  success: true,
  data: {
    id: '9875976b-2451-4724-a209-a959b6767130',
    title: 'new article',
    description: 'this is new article.',
    imgUrl:
      'http://localhost:3000/uploads/black-pant-eea9832fff278afb97b6e3ea83b9b4010.jpg',
  },
  message: 'Request successfully executed!!',
};

export const articleNotFound = {
  message: 'Given article doesnot exist',
  error: 'Not Found',
  statusCode: 404,
};
