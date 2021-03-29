import { lazy } from 'react';

export const LazyVideoPlayer = lazy(() => import('./page/result/VideoPlayer'));
export const LazyMain = lazy(() => import('./page/main/Main'));
export const LazySearchBox = lazy(() => import('./page/SearchBox'));
export const LazyShowResultSearch = lazy(() => import('./page/result/ShowResultSearch'));
export const LazyVideoDetailPlayer = lazy(() => import('./page/result/VideoDetailPlayer'));
