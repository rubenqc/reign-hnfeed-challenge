import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

// const client = new MongoClient(uri, { useUnifiedTpology: true });
// async function run() {
//   await client.connect();
//   const database = client.db('hnfeed-store');
//   const storyCollection = database.collection('sto ries');
//   const stories = await storyCollection.find().toArray();
//   console.log(stories);
// }

// run();

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri =
          'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary';
        const client = new MongoClient(uri);
        await client.connect();
        return client.db('hnfeed-store');
      },
    },
  ],
  exports: ['MONGO']
})
export class DatabaseModule {}
