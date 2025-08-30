import React, { useState, useEffect } from 'react';

interface ItemFormProps {
    onSubmit: (data: { title: string; description: string }, editingId: string | null) => void;
    editingId?: string | null;
    initialTitle?: string | null;
    initialDescription?: string | null;
}

const ItemForm: React.FC<ItemFormProps> = ({
    onSubmit,
    editingId = null,
    initialTitle = '',
    initialDescription = '',
}) => {
    const [title, setTitle] = useState(initialTitle || '');
    const [description, setDescription] = useState(initialDescription || '');

    // Обновлять локальный стейт при изменении initialTitle/initialDescription
    useEffect(() => {
        setTitle(initialTitle || '');
        setDescription(initialDescription || '');
    }, [initialTitle, initialDescription]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSubmit({ title, description }, editingId ?? null);
        setTitle('');
        setDescription('');
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">{editingId ? 'Сохранить' : 'Добавить'}</button>
            {editingId && (
                <button type="button" onClick={handleCancel}>
                    Отмена
                </button>
            )}
        </form>
    );
};

export default React.memo(ItemForm);