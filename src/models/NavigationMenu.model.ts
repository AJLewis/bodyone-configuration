import { Schema, model, Document, Types } from 'mongoose';

interface NavigationMenu extends Document {
    name: string;
    menuItems: Types.ObjectId[];
}

const NavigationMenuSchema = new Schema<NavigationMenu>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    menuItems: [{
        type: Types.ObjectId,
        ref: 'NavigationMenuItem'
    }]
});

const NavigationMenu = model<NavigationMenu>('NavigationMenu', NavigationMenuSchema);

export default NavigationMenu;