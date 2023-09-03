import { NextResponse } from 'next/server';
import { IPaginated, IPostDto, PostId } from '@/app/types';
import { chunk } from 'lodash';

export async function GET(
  request: Request,
): Promise<NextResponse<IPaginated<IPostDto>>> {
  const url = new URL(request.url);

  const page = getQueryParamInt(url.searchParams, 'page', 0);
  const perPage = getQueryParamInt(url.searchParams, 'perPage', 10);

  const allPosts: IPostDto[] = [
    {
      id: 126 as PostId,
      slug: 'libero-exercitationem-cum-veniam',
      title: 'Libero exercitationem cum veniam',
      excerpt:
        'Donec ut orci porttitor, sagittis mauris nec, semper metus. Vestibulum eget justo viverra, lobortis est in, pretium enim.',
      imageUrl: 'https://picsum.photos/id/237/800/600',
      categories: [7],
      createdAt: '2023-09-03T16:18:07.950Z',
      minutesToRead: 6,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 172 as PostId,
      slug: 'architecto-rerum-minima-fuga',
      title: 'Architecto rerum minima',
      excerpt:
        'Integer et ipsum ut enim porttitor vulputate. Nunc a nisi finibus, scelerisque erat in, elementum eros.',
      imageUrl: 'https://picsum.photos/id/238/800/600',
      categories: [3],
      createdAt: '2023-08-03T16:18:07.950Z',
      minutesToRead: 12,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 176 as PostId,
      slug: 'saepe-magni-velit-facilis-eligendi-ratione-autem',
      title: 'Saepe magni velit facilis eligendi ratione autem',
      excerpt:
        'Nunc rhoncus lorem a pretium interdum. Etiam vulputate neque eget risus congue ullamcorper ac sed nulla.',
      imageUrl: 'https://picsum.photos/id/239/800/600',
      categories: [5],
      createdAt: '2023-09-01T16:18:07.950Z',
      minutesToRead: 3,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 144 as PostId,
      slug: 'deserunt-sint-repellendus-expedita-repellendus',
      title: 'Deserunt sint repellendus expedita repellendus',
      excerpt:
        'Proin ac lorem efficitur, finibus tellus et, gravida ante. Phasellus ac magna eget lectus venenatis laoreet.',
      imageUrl: 'https://picsum.photos/id/240/800/600',
      categories: [6, 7],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 150 as PostId,
      slug: 'pariatur-tempora-repellat-delectus',
      title: 'Pariatur tempora repellat delectus',
      excerpt:
        'Ut auctor tortor eu diam vestibulum mattis. Phasellus tempor mi eu mollis finibus.',
      imageUrl: 'https://picsum.photos/id/241/800/600',
      categories: [6],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 124 as PostId,
      slug: 'vel-cupiditate-tempore-quo-sunt-ut',
      title: 'Vel cupiditate tempore quo sunt ut',
      excerpt:
        'Etiam ultricies ex et sem blandit pulvinar. Mauris aliquet lorem euismod iaculis faucibus.',
      imageUrl: 'https://picsum.photos/id/242/800/600',
      categories: [7, 8],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 146 as PostId,
      slug: 'quisquam-quis-tenetur-cumque-explicabo',
      title: 'Quisquam quis tenetur cumque explicabo',
      excerpt:
        'Vivamus ornare sem vel nisl facilisis, eu faucibus metus hendrerit. Etiam scelerisque dolor sed placerat pulvinar.',
      imageUrl: 'https://picsum.photos/id/243/800/600',
      categories: [8],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 136 as PostId,
      slug: 'earum-et-consequatur-ut',
      title: 'Earum et consequatur ut',
      excerpt:
        'Fusce ullamcorper magna eu libero mollis lobortis. Praesent non dui eu felis facilisis mattis id non neque.',
      imageUrl: 'https://picsum.photos/id/244/800/600',
      categories: [8],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 132 as PostId,
      slug: 'at-nobis-inventore-accusantium',
      title: 'At nobis inventore accusantium',
      excerpt:
        'Mauris lobortis massa tristique neque sodales, et lobortis nisl sollicitudin. Morbi sit amet libero vitae orci euismod pellentesque.',
      imageUrl: 'https://picsum.photos/id/245/800/600',
      categories: [4, 5],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 110 as PostId,
      slug: 'eum-excepturi-nihil-similique-autem-iure-ea',
      title: 'Eum excepturi nihil similique autem iure ea',
      excerpt:
        'Morbi at odio elementum, congue eros quis, efficitur augue. Etiam eu ex fermentum urna vulputate commodo et ac massa.',
      imageUrl: 'https://picsum.photos/id/246/800/600',
      categories: [4, 5],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 160 as PostId,
      slug: 'voluptatum-dolorem-unde-nobis-qui',
      title: 'Voluptatum dolorem unde nobis qui',
      excerpt:
        'Etiam a nibh porttitor, blandit magna a, varius velit. Nulla tempus dui vel dolor lobortis luctus.',
      imageUrl: 'https://picsum.photos/id/247/800/600',
      categories: [5, 6],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 140 as PostId,
      slug: 'nulla-eligendi-ipsum-est-suscipit-consequuntur',
      title: 'Nulla eligendi ipsum est suscipit consequuntur',
      excerpt:
        'Aenean mollis neque tempus, finibus eros non, mollis est. Etiam efficitur neque scelerisque ullamcorper lacinia.',
      imageUrl: 'https://picsum.photos/id/248/800/600',
      categories: [3, 4],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 108 as PostId,
      slug: 'quisquam-earum-minima-expedita',
      title: 'Quisquam earum minima expedita',
      excerpt:
        'Praesent imperdiet sapien faucibus libero pulvinar, vel mollis nunc accumsan. Ut molestie leo ac dui congue, eget viverra urna eleifend.',
      imageUrl: 'https://picsum.photos/id/249/800/600',
      categories: [6, 8],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 156 as PostId,
      slug: 'nemo-illo-accusamus-et',
      title: 'Nemo illo accusamus et',
      excerpt:
        'Pellentesque nec ligula eu tortor imperdiet dignissim. Proin molestie est eget dignissim lacinia.',
      imageUrl: 'https://picsum.photos/id/250/800/600',
      categories: [3],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 142 as PostId,
      slug: 'eligendi-impedit-quasi-omnis',
      title: 'Eligendi impedit quasi omnis',
      excerpt:
        'Cras sed quam molestie, dapibus dolor at, tempus tellus. Nullam nec eros in felis posuere faucibus vitae semper ante.',
      imageUrl: 'https://picsum.photos/id/251/800/600',
      categories: [3, 8],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 154 as PostId,
      slug: 'facilis-aut-ea-non',
      title: 'Facilis aut ea non',
      excerpt:
        'Cras lacinia turpis eget erat maximus, in blandit ex rhoncus. Morbi eu nibh cursus, dapibus dui a, vestibulum dolor.',
      imageUrl: 'https://picsum.photos/id/252/800/600',
      categories: [4],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 128 as PostId,
      slug: 'quod-tempore-molestiae-dolor',
      title: 'Quod tempore molestiae dolor',
      excerpt:
        'Donec luctus justo tempus mi elementum, ac varius elit sollicitudin. Sed pulvinar ex ac libero pharetra, a molestie sem dignissim.',
      imageUrl: 'https://picsum.photos/id/253/800/600',
      categories: [8],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 114 as PostId,
      slug: 'enim-fugiat-libero-exercitationem-voluptas-cupiditate',
      title: 'Enim fugiat libero exercitationem voluptas cupiditate',
      excerpt:
        'Mauris sed ipsum ut ligula efficitur tempus sit amet nec risus. Nulla placerat ex eu metus bibendum volutpat.',
      imageUrl: 'https://picsum.photos/id/254/800/600',
      categories: [7],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 130 as PostId,
      slug: 'ullam-et-voluptatem-eligendi-illum-quas',
      title: 'Ullam et voluptatem eligendi illum quas',
      excerpt:
        'Phasellus mattis nisi fermentum, porttitor lacus ornare, scelerisque ipsum. Fusce tincidunt dui quis urna congue, id mattis augue pretium.',
      imageUrl: 'https://picsum.photos/id/255/800/600',
      categories: [5],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 166 as PostId,
      slug: 'laboriosam-quam-inventore-officia-non',
      title: 'Laboriosam quam inventore officia non',
      excerpt:
        'Aliquam aliquet turpis sit amet sapien ultrices vestibulum. Suspendisse eget nulla id nibh tincidunt facilisis at et augue.',
      imageUrl: 'https://picsum.photos/id/256/800/600',
      categories: [5],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 118 as PostId,
      slug: 'aliquid-nisi-mollitia-beatae',
      title: 'Aliquid nisi mollitia beatae',
      excerpt:
        'Aenean quis justo cursus, efficitur sem at, fermentum orci. Cras non urna dictum est sagittis vehicula a quis libero.',
      imageUrl: 'https://picsum.photos/id/257/800/600',
      categories: [3],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 180 as PostId,
      slug: 'voluptas-porro-est-quidem-veritatis',
      title: 'Voluptas porro est quidem veritatis',
      excerpt:
        'Nulla ut ligula quis ex tincidunt vehicula. In fringilla justo non lorem tempor, nec fermentum felis blandit.',
      imageUrl: 'https://picsum.photos/id/258/800/600',
      categories: [4, 5],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 112 as PostId,
      slug: 'eaque-odit-fugiat-et-ea-iure',
      title: 'Eaque odit fugiat et ea iure',
      excerpt:
        'Nullam vitae purus vel orci mollis mattis. Suspendisse et turpis vitae est venenatis sodales.',
      imageUrl: 'https://picsum.photos/id/259/800/600',
      categories: [7, 8],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 186 as PostId,
      slug: 'cupiditate-omnis-explicabo-doloribus-non-quis-magni',
      title: 'Cupiditate omnis explicabo doloribus non quis magni',
      excerpt:
        'Morbi tincidunt urna sit amet accumsan molestie. Aenean volutpat diam vitae sapien auctor, non consectetur nulla aliquet.',
      imageUrl: 'https://picsum.photos/id/260/800/600',
      categories: [3, 7],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 170 as PostId,
      slug: 'dicta-voluptatem-quisquam-nisi-voluptatum',
      title: 'Dicta voluptatem quisquam nisi voluptatum',
      excerpt:
        'Cras in nunc id nisl elementum dictum. Donec sit amet arcu vulputate, malesuada tellus et, semper lectus.',
      imageUrl: 'https://picsum.photos/id/261/800/600',
      categories: [5, 6],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 164 as PostId,
      slug: 'est-dolorem-voluptatem-iste-ut',
      title: 'Est dolorem voluptatem iste ut',
      excerpt:
        'Cras porta diam pulvinar, viverra odio at, faucibus lorem. Integer iaculis nunc a sodales sagittis.',
      imageUrl: 'https://picsum.photos/id/262/800/600',
      categories: [8],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 138 as PostId,
      slug: 'minus-nisi-deserunt-est-vero',
      title: 'Minus nisi deserunt est vero',
      excerpt:
        'Aliquam condimentum mauris nec semper tristique. Praesent porta lorem eget lectus viverra convallis.',
      imageUrl: 'https://picsum.photos/id/263/800/600',
      categories: [8, 4],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 182 as PostId,
      slug: 'et-non-sit-dolores-qui',
      title: 'Et non sit dolores qui',
      excerpt:
        'Integer vitae sem sed enim vehicula volutpat. Duis eget odio ac lorem feugiat aliquam eu nec nisl.',
      imageUrl: 'https://picsum.photos/id/264/800/600',
      categories: [6, 4],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 178 as PostId,
      slug: 'aut-iste-id-totam-et-a',
      title: 'Aut iste id totam et a',
      excerpt:
        'Nam vel lacus a est tempor iaculis. Praesent quis est ut sem tempus facilisis.',
      imageUrl: 'https://picsum.photos/id/265/800/600',
      categories: [4, 5],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 148 as PostId,
      slug: 'eos-voluptas-laboriosam-perspiciatis-placeat-molestias',
      title: 'Eos voluptas laboriosam perspiciatis placeat molestias',
      excerpt:
        'Pellentesque vitae diam vel felis sagittis placerat eu non nibh. Pellentesque auctor lectus a neque consectetur, vitae tristique ligula vulputate.',
      imageUrl: 'https://picsum.photos/id/266/800/600',
      categories: [8, 7],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 116 as PostId,
      slug: 'nihil-voluptatibus-sed-qui-officiis-fuga',
      title: 'Nihil voluptatibus sed qui officiis fuga',
      excerpt:
        'Praesent laoreet sapien non purus maximus, eu placerat arcu venenatis. Aliquam ornare nunc eleifend ex maximus, nec pretium mi dapibus.',
      imageUrl: 'https://picsum.photos/id/267/800/600',
      categories: [8, 7],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 120 as PostId,
      slug: 'dignissimos-et-eligendi-beatae',
      title: 'Dignissimos et eligendi beatae',
      excerpt:
        'Proin molestie magna ut nisi porttitor, nec accumsan arcu interdum. Ut pulvinar metus quis urna volutpat ullamcorper.',
      imageUrl: 'https://picsum.photos/id/268/800/600',
      categories: [8, 4],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 174 as PostId,
      slug: 'non-sint-eum-minus-repellendus-est',
      title: 'Non sint eum minus repellendus est',
      excerpt:
        'Phasellus vel lorem blandit, euismod leo ut, porttitor dui. Curabitur quis odio vel lorem efficitur dapibus vel id nibh.',
      imageUrl: 'https://picsum.photos/id/269/800/600',
      categories: [5],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 184 as PostId,
      slug: 'laborum-unde-beatae-facere',
      title: 'Laborum unde beatae facere',
      excerpt:
        'Nulla ut urna non mauris vehicula finibus nec sit amet urna. Aenean convallis justo eget leo auctor blandit.',
      imageUrl: 'https://picsum.photos/id/270/800/600',
      categories: [7],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 152 as PostId,
      slug: 'quia-dolore-esse-quibusdam-sint-vel-in',
      title: 'Quia dolore esse quibusdam sint vel in',
      excerpt:
        'Curabitur id quam vitae ex vehicula finibus quis in odio. Integer bibendum nisl a tristique hendrerit.',
      imageUrl: 'https://picsum.photos/id/271/800/600',
      categories: [4, 3],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 168 as PostId,
      slug: 'voluptate-qui-repudiandae-voluptatem-dolores',
      title: 'Voluptate qui repudiandae voluptatem dolores',
      excerpt:
        'Donec mollis turpis varius sapien tristique ornare. Cras ut diam quis massa sodales interdum.',
      imageUrl: 'https://picsum.photos/id/272/800/600',
      categories: [4],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 134 as PostId,
      slug: 'id-totam-et-est-voluptate-quo',
      title: 'Id totam et est voluptate quo',
      excerpt:
        'Sed non felis sit amet nibh fringilla commodo. Aenean ut neque mattis, hendrerit lorem ut, ultrices diam.',
      imageUrl: 'https://picsum.photos/id/273/800/600',
      categories: [4, 5],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 122 as PostId,
      slug: 'molestias-alias-deserunt-et-vero-omnis',
      title: 'Molestias alias deserunt et vero omnis',
      excerpt:
        'Vivamus imperdiet sem sed nisi tempus, quis lacinia lorem dictum. Nullam vel lectus sit amet justo sagittis sodales.',
      imageUrl: 'https://picsum.photos/id/274/800/600',
      categories: [4, 5],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 158 as PostId,
      slug: 'natus-et-ducimus-rerum-saepe',
      title: 'Natus et ducimus rerum saepe',
      excerpt:
        'Phasellus gravida sem non ex aliquet, sed iaculis risus iaculis. Quisque molestie diam eu quam lobortis, at tincidunt nulla feugiat.',
      imageUrl: 'https://picsum.photos/id/275/800/600',
      categories: [8],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 162 as PostId,
      slug: 'quod-soluta-consequatur-facilis-dicta',
      title: 'Quod soluta consequatur facilis dicta',
      excerpt:
        'Suspendisse a nunc eu velit sagittis laoreet. Phasellus commodo velit scelerisque, scelerisque risus ut, imperdiet magna.',
      imageUrl: 'https://picsum.photos/id/276/800/600',
      categories: [6],
      createdAt: '2023-07-13T16:18:07.950Z',
      minutesToRead: 5,
      author: {
        name: 'Michael Foster',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
  ];

  const paginatedPosts = chunk(allPosts, perPage)[page] || [];

  return NextResponse.json({
    data: paginatedPosts,
    total: allPosts.length,
  });
}

function getQueryParamInt(
  searchParams: URLSearchParams,
  paramName: string,
  defaultValue: number,
) {
  const queryParam = searchParams.get(paramName) || `${defaultValue}`;

  const int = parseInt(queryParam, 10);

  if (Number.isNaN(int)) return defaultValue;

  return int;
}
