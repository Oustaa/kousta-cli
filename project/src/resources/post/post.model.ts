import { Schema, model, Document } from 'mongoose';

export interface PostInterface extends Document {
  title: string;
  body: string;
}

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<PostInterface>('Post', PostSchema);
