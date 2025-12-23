const STORAGE_KEYS = {
    GEMINI_API_KEY: 'ara_gemini_key',
    PERPLEXITY_API_KEY: 'ara_perplexity_key',
};

export interface ApiKeys {
    geminiKey: string;
    perplexityKey: string;
}

export const getStoredKeys = (): ApiKeys => {
    return {
        geminiKey: localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY) || '',
        perplexityKey: localStorage.getItem(STORAGE_KEYS.PERPLEXITY_API_KEY) || '',
    };
};

export const storeKeys = (keys: ApiKeys) => {
    localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY, keys.geminiKey);
    localStorage.setItem(STORAGE_KEYS.PERPLEXITY_API_KEY, keys.perplexityKey);
};

export const clearKeys = () => {
    localStorage.removeItem(STORAGE_KEYS.GEMINI_API_KEY);
    localStorage.removeItem(STORAGE_KEYS.PERPLEXITY_API_KEY);
};
