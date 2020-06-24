conn = new Mongo("mongodb+srv://cluster0-jbtnk.mongodb.net");
db = conn.getDB("test");

cursor = db.collection("readables").find();
while (cursor.hasNext()) {
  printjson(cursor.next());
}
