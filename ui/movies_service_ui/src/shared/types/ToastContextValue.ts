export type ToastParams = {
    status: "success" | "error" | "info",
    title: string,
    description?: string 
}

export type ToastContextValue = {
    showToast: (params: ToastParams) => void 
}