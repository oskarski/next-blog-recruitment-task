export class AppNavigation {
  static home(): string {
    return '/';
  }

  static postDetails(postSlug: string): string {
    return `/posts/${postSlug}`;
  }

  static categoryDetails(categorySlug: string): string {
    return `/category/${categorySlug}`;
  }
}
