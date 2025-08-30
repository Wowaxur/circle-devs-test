import { createApi } from '@reduxjs/toolkit/query/react';
import type { Item } from './types';
import { collection,addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: () => ({ error: 'Не удалось' }),
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            async queryFn() {
                return { data: undefined as unknown as Item[] }; // начальное значение: undefined
            },
            async onCacheEntryAdded(
                _,
                { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
            ) {
                await cacheDataLoaded;
                const itemsRef = collection(db, 'items');
                const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
                    const data: Item[] = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as Item[];
                    updateCachedData(() => data);
                });

                // дожидаемся, пока этот кеш "закроется", и тогда отписываемся
                await cacheEntryRemoved;
                unsubscribe();
            },
        }),
        addItem: builder.mutation<Item, Partial<Item>>({
            async queryFn(body: Partial<Item>) {
                try {
                    const itemsRef = collection(db, 'items');
                    const docRef = await addDoc(itemsRef, body);
                    return {
                        data: {
                            id: docRef.id,
                            title: body.title || '',
                            description: body.description || '',
                        } as Item
                    };
                } catch (error) {
                    return { error: String(error) };
                }
            },
        }),
        updateItem: builder.mutation<Item, Item>({
            async queryFn({ id, ...body }) {
                if (!id) {
                    return { error: 'id is required' };
                }
                try {
                    await updateDoc(doc(db, 'items', id), body);
                    return { data: { id, ...body } };
                } catch (error) {
                    return { error: String(error) };
                }
            },
        }),
        deleteItem: builder.mutation<{ id: string }, string>({
            async queryFn(id) {
                try {
                    await deleteDoc(doc(db, 'items', id));
                    return { data: { id } };
                } catch (error) {
                    return { error: String(error) };
                }
            },
        }),
    }),
});

export const {
    useGetItemsQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemsApi;