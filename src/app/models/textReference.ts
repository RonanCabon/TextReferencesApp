export interface TextReference {
    key: string,
    value: {
        id: number;
        category: string;
        title: string;
        url: string;
        description: string;
        bookmarkNote: string;
        read: boolean;
    }
}