type HSLColor = {
    h: number;
    s: number;
    l: number;
};

type ColorPalette = {
    base: string;
    hover: string;
    accent: string;
    muted: string;
    shadow: string;
    border: string;
};

function hexToHSL(hex: string): HSLColor {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }

    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h! *= 60;
        if (h! < 0) h! += 360;
    }

    return { h: Math.round(h!), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function createColorPalette(hex: string): ColorPalette {
    const { h, s } = hexToHSL(hex);
    return {
        base: `hsl(${h}, ${s}%, 35%)`,
        hover: `hsl(${h}, ${s}%, 25%)`,
        accent: `hsl(${h}, ${s}%, 80%)`,
        muted: `hsl(${h}, ${s}%, 95%)`,
        shadow: `hsl(${h}, ${s}%, 9%)`,
        border: `hsl(${h}, ${s}%, 30%)`,
    };
}