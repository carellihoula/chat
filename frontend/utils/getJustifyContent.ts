
export const getJustifyContent = (borderType: string) => {
    switch (borderType) {
        case 'full':
        case 'center':
            return 'center';
        case 'left':
            return 'left';
        case 'right':
            return 'right';
        default: 
            return 'center';
    }
}