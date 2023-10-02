
export const POST_STATUS = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
}

export const PostTitleMapping = new Map<string, string>([
    ['success', 'Đã duyệt'],
    ['warning', 'Chờ duyệt'],
    ['error', 'Không duyệt']
])
