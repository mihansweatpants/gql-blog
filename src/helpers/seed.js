import { models } from '~/models';

export default async () => {
  return Promise.all([
    models.User.create({
      username: 'boris',
      email: 'boris@mail.net',
      password: 'qwerty',
    }),
    models.User.create({
      username: 'borat',
      email: 'borat@internet.io',
      password: 'qwerty',
    }),
    models.User.create({
      username: 'jimmy',
      email: 'jimmy@website.org',
      password: 'qwerty',
    }),
    models.User.create({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      role: 'admin',
    }),
    models.Post.create({
      title: 'My first post',
      text: 'hello there :)',
      thumbnail:
        'https://d1q6f0aelx0por.cloudfront.net/product-logos/5431a80b-9ab9-486c-906a-e3d4b5ccaa96-hello-world.png',
    }),
    models.Post.create({
      title: 'How I got probed',
      text:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit nihil vitae obcaecati provident maxime consectetur adipisci qui quas at expedita velit commodi quos quaerat, voluptatem, laboriosam explicabo quibusdam necessitatibus itaque.',
      thumbnail:
        'https://media4.s-nbcnews.com/j/newscms/2018_04/2306811/180126-alien-mn-1345_a45560a5a5fd8459dcc14b914ddf1dd2.fit-760w.jpg',
    }),
    models.Post.create({
      title: "It's all fun and games",
      text:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor repellendus velit numquam iure quia ipsam quas accusantium? Tempora sequi, eos, ipsam, maxime nobis blanditiis quas distinctio praesentium deserunt omnis accusantium!',
      thumbnail:
        'https://cdn.drawception.com/images/panels/2014/10-4/m85ngfrBjw-6.png',
    }),
  ]).then(([boris, borat, jimmy, admin, post1, post2, post3]) =>
    Promise.all([
      post1.setUser(jimmy),
      post2.setUser(boris),
      post3.setUser(boris),
    ])
  );
};
