import { Schema, model, Document } from 'mongoose';

interface Theme extends Document {
    dark: boolean;
    colors: any;
    fonts: any;
    config: any;
}

const ThemeSchema = new Schema<Theme>({
    dark: Boolean,
    colors: Schema.Types.Mixed,
    fonts: Schema.Types.Mixed,
    config: Schema.Types.Mixed
});

const Theme = model<Theme>('Theme', ThemeSchema);

export default Theme;