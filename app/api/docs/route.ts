import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	if (searchParams.get('format') === 'json') {
		const json = {
			message: 'Wallpaper API Endpoints',
			endpoints: [
				{
					name: 'Search Wallpapers',
					method: 'GET',
					url: '/api/wallpapers/search',
					example: '/api/wallpapers/search?q=batman&page=1&perPage=24',
					description: 'Search wallpapers by query, tags, author, or category.',
					parameters: {
						q: 'Search query (string)',
						page: 'Page number',
						perPage: 'Results per page'
					}
				},
				{
					name: 'Get Wallpaper by ID',
					method: 'GET',
					url: '/api/wallpapers/[id]',
					example: '/api/wallpapers/1pg3ynr',
					description: 'Get a single wallpaper by its ID.',
					parameters: {
						id: 'Wallpaper ID'
					}
				},
				{
					name: 'Recent Wallpapers',
					method: 'GET',
					url: '/api/wallpapers/recent',
					example: '/api/wallpapers/recent?page=1&perPage=24',
					description: 'Get recently added wallpapers.',
					parameters: {
						page: 'Page number',
						perPage: 'Results per page'
					}
				},
				{
					name: 'Hot Wallpapers',
					method: 'GET',
					url: '/api/wallpapers/hot',
					example: '/api/wallpapers/hot?page=1&perPage=24',
					description: 'Get wallpapers sorted by favorites.',
					parameters: {
						page: 'Page number',
						perPage: 'Results per page'
					}
				},
				{
					name: 'Most Viewed Wallpapers',
					method: 'GET',
					url: '/api/wallpapers/mostview',
					example: '/api/wallpapers/mostview?page=1&perPage=24',
					description: 'Get wallpapers sorted by views.',
					parameters: {
						page: 'Page number',
						perPage: 'Results per page'
					}
				},
				{
					name: 'Filter by Tags',
					method: 'GET',
					url: '/api/wallpapers/tags',
					example: '/api/wallpapers/tags?tags=batman&tags=cityscape&page=1&perPage=24',
					description: 'Get wallpapers matching all specified tags.',
					parameters: {
						tags: 'List of tags (repeat param for multiple)',
						page: 'Page number',
						perPage: 'Results per page'
					}
				},
				{
					name: 'Meta Information',
					method: 'GET',
					url: '/api/wallpapers/meta',
					example: '/api/wallpapers/meta',
					description: 'Get meta info (counts, categories, tags, etc.)',
					parameters: {}
				}
			],
			status: 'active',
			version: '1.0'
		};
		return NextResponse.json(json);
	}
	const markdown = `# Wallpaper API Documentation

## Endpoints

### 1. Search Wallpapers
/api/wallpapers/search
**Query params:**
- q: Search query (string)
- page, perPage: Pagination

### 2. Get Wallpaper by ID
/api/wallpapers/[id]
**Path param:**
- id: Wallpaper ID

### 3. Recent Wallpapers
/api/wallpapers/recent
**Query params:**
- page, perPage: Pagination

### 4. Hot Wallpapers
/api/wallpapers/hot
**Query params:**
- page, perPage: Pagination

### 5. Most Viewed Wallpapers
/api/wallpapers/mostview
**Query params:**
- page, perPage: Pagination

### 6. Filter by Tags
/api/wallpapers/tags
**Query params:**
- tags: List of tags (repeat param for multiple)
- page, perPage: Pagination

### 7. Meta Information
/api/wallpapers/meta
Returns meta info (counts, categories, tags, etc.)

## Response Format
All list endpoints return:
{
  total: number,
  page: number,
  perPage: number,
  wallpapers: Wallpaper[]
}
Single wallpaper endpoint returns:
Wallpaper | {}

## Wallpaper Object
{
  id: string,
  provider: string,
  url: string,
  short_url: string,
  views: number,
  favorites: number,
  source: string,
  purity: string,
  category: string,
  dimension_x: number | null,
  dimension_y: number | null,
  resolution: string | null,
  ratio: string | null,
  file_size: number | null,
  file_type: string | null,
  created_at: string,
  path: string,
  thumbs: { large: string, original: string, small: string },
  tags: string[],
  author: string,
  permalink: string,
  flair: string | null,
  is_gallery: boolean
}

## Example Usage

Search:
/api/wallpapers/search?q=batman&page=1&perPage=24

Get by ID:
/api/wallpapers/1pg3ynr

Recent:
/api/wallpapers/recent?page=1&perPage=24

Hot:
/api/wallpapers/hot?page=1&perPage=24

Most Viewed:
/api/wallpapers/mostview?page=1&perPage=24

Tags:
/api/wallpapers/tags?tags=batman&tags=cityscape&page=1&perPage=24

Meta:
/api/wallpapers/meta

---
For more details, see the source code or contact the API maintainer.
`;
	return new NextResponse(markdown, {
		headers: { 'Content-Type': 'text/markdown' }
	});
}
