import mongoose from 'mongoose';

export interface ILog {
    name: string,
    site: string,
    time: string,
}

const schema = new mongoose.Schema<ILog>({
    name: String,
    site: String,
    time: String,
});

export default mongoose.model<ILog>('Log', schema);