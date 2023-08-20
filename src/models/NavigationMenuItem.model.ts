import { Schema, model, Document } from 'mongoose';

interface NavigationMenuItem extends Document {
    link: string;
    backgroundColor?: string;
    fontColor: string;
    text: string;
    iconName: any;
    library: any;
    hideHorizontalLine?: boolean;
}

const NavigationMenuItemSchema = new Schema<NavigationMenuItem>({
    link: String,
    backgroundColor: String,
    fontColor: String,
    text: String,
    iconName: String,
    library: String,
    hideHorizontalLine: Boolean
});

const NavigationMenuItem = model<NavigationMenuItem>('NavigationMenuItem', NavigationMenuItemSchema);

export default NavigationMenuItem;