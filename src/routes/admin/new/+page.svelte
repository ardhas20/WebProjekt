<script>
    let { data } = $props();
</script>
 
<h1>CREATE A NEW ARTICLE</h1>
 
<form method="POST" action="?/createArticle" enctype="multipart/form-data">
    <label for="image">IMAGE</label>
    <input type="file" placeholder="Image" name="file" />
 
    <label for="description">DESCRIPTION</label>
    <textarea placeholder="Description" name="description"></textarea>
   
    <label for="author">AUTHOR</label>
    <input type="text" placeholder="Author" name="author" />
   
    <button type="submit">CREATE ARTICLE</button>
   
</form>