import { models } from '~/models';

const qwerty = '$2a$10$Nef2dWrjqseggnZjH9Vm5uNSGVlajWCKD3RDgMbSA9y5u5wPHGjEm';
const admin = '$2a$10$.8xasUejB6/ruiJQdsRNvO/2vuC1YW.iDdshgq19x3iCdRh0tIQyK';

export default async () => {
  return Promise.all([
    models.User.create({
      username: 'boris',
      email: 'boris@mail.net',
      password: qwerty,
      avatar:
        'https://pp.userapi.com/c846522/v846522836/16a782/y8AbSC3JhYs.jpg?ava=1',
    }),
    models.User.create({
      username: 'borat',
      email: 'borat@internet.io',
      password: qwerty,
      avatar:
        'https://miro.medium.com/fit/c/80/80/1*NwS9KzJzWwwTQiYSOs_56g.jpeg',
    }),
    models.User.create({
      username: 'jimmy',
      email: 'jimmy@website.org',
      password: qwerty,
      avatar:
        'https://cdn-images-1.medium.com/fit/c/78/78/1*iDxtsn7a6PdSNlWT2rHuxg.jpeg',
    }),
    models.User.create({
      username: 'admin',
      email: 'admin@admin.com',
      password: admin,
      role: 'admin',
    }),
    models.Post.create({
      title: 'How I got probed',
      description: 'Story about worst christmast in my life...',
      text:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit nihil vitae obcaecati provident maxime consectetur adipisci qui quas at expedita velit commodi quos quaerat, voluptatem, laboriosam explicabo quibusdam necessitatibus itaque. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit nihil vitae obcaecati provident maxime consectetur adipisci qui quas at expedita velit commodi quos quaerat, voluptatem, laboriosam explicabo quibusdam necessitatibus itaque. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit nihil vitae obcaecati provident maxime consectetur adipisci qui quas at expedita velit commodi quos quaerat, voluptatem, laboriosam explicabo quibusdam necessitatibus itaque.',
      thumbnail:
        'https://media4.s-nbcnews.com/j/newscms/2018_04/2306811/180126-alien-mn-1345_a45560a5a5fd8459dcc14b914ddf1dd2.fit-760w.jpg',
    }),
    models.Post.create({
      title: "It's all fun and games",
      description: 'Until they abduct and probe your anus',
      text:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor repellendus velit numquam iure quia ipsam quas accusantium? Tempora sequi, eos, ipsam, maxime nobis blanditiis quas distinctio praesentium deserunt omnis accusantium! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit nihil vitae obcaecati provident maxime consectetur adipisci qui quas at expedita velit commodi quos quaerat, voluptatem, laboriosam explicabo quibusdam necessitatibus itaque. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit nihil vitae obcaecati provident maxime consectetur adipisci qui quas at expedita velit commodi quos quaerat, voluptatem, laboriosam explicabo quibusdam necessitatibus itaque.',
      thumbnail:
        'https://cdn.drawception.com/images/panels/2014/10-4/m85ngfrBjw-6.png',
    }),
    models.Post.create({
      title: 'My first post',
      text: 'hello there :)',
      thumbnail:
        'https://d1q6f0aelx0por.cloudfront.net/product-logos/5431a80b-9ab9-486c-906a-e3d4b5ccaa96-hello-world.png',
      description: 'just testing',
    }),
  ]).then(([boris, borat, jimmy, admin, post1, post2, post3]) =>
    Promise.all([
      post1.setUser(boris),
      post2.setUser(boris),
      post3.setUser(jimmy),
    ])
  );
};
