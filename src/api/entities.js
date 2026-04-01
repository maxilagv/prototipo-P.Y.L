import collectionsData from '@/data/collections.json';
import artworksData from '@/data/artworks.json';

function sortBy(arr, field) {
  if (!field) return arr;
  return [...arr].sort((a, b) => {
    if (a[field] == null) return 1;
    if (b[field] == null) return -1;
    return a[field] > b[field] ? 1 : -1;
  });
}

function applyFilter(arr, filters = {}) {
  return arr.filter((item) =>
    Object.entries(filters).every(([key, val]) => item[key] == val)
  );
}

export const Collection = {
  list: (sort) => Promise.resolve(sortBy(collectionsData, sort)),
  filter: (filters, sort) => Promise.resolve(sortBy(applyFilter(collectionsData, filters), sort)),
};

export const Artwork = {
  list: (sort) => Promise.resolve(sortBy(artworksData, sort)),
  filter: (filters, sort) => Promise.resolve(sortBy(applyFilter(artworksData, filters), sort)),
};

export const Inquiry = {
  create: (data) => {
    console.log('[Inquiry] Nueva consulta recibida:', data);
    return Promise.resolve({ ok: true });
  },
};
