<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <h3 class="text-center text-success">Laravel and Vue CRUD operation </h3>
                <div class="card mt-3">
                    <div class="card-header clearfix">
                        <h3 class="float-left">All Posts</h3>
                        <button  @click.prevent="createModal" class="btn btn-success float-right">Add Post</button>

                        <div class="modal fade"  tabindex="-1"  aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h3 class="modal-title text-success" v-if="modalShow"> Add New Post </h3>
                                        <h3 class="modal-title text-success"  v-if="!modalShow"> Edit Post</h3>
                                        <button @click="formResetByCloseBtnHeader" type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="form-group">
                                                <label for="title" class="col-form-label">Post Title</label>
                                                <input type="text" v-model="form.title" class="form-control" id="title">
                                                <div class="text-danger" v-if="form.errors.has('title')" v-html="form.errors.get('title')" />
                                            </div>
                                            <div class="form-group">
                                                <label for="description" class="col-form-label">Post Description</label>
                                                <textarea class="form-control" v-model="form.description" id="description" rows="5"></textarea>
                                                <div class="text-danger" v-if="form.errors.has('description')" v-html="form.errors.get('description')" />
                                            </div>
                                            <div class="modal-footer">
                                                <button @click="formResetByCloseBtnFooter" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                                <button v-if="modalShow" type="button" @click.prevent="createPost" class="btn btn-success">Add Post</button>
                                                <button v-if="!modalShow"  type="button" @click.prevent="updatePost" class="btn btn-success">UpdatePost</button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-body" v-if="posts.length">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Description</th>
                                <th style="width: 150px">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="post in posts" :key="post.id">
                                    <td>{{ post.id }}</td>

                                    <td>{{ post.title }}</td>
                                    <td>{{ post.slug }}</td>

                                    <td>{{ post.description }}</td>
                                    <td style="width: 150px">
                                        <button @click.prevent="editModal(post)"  class="btn btn-success">Edit</button>
                                        <button @click.prevent="deletePost(post.id)" class="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row text-center my-5" v-else>
                        <div class="col-12">
                            <h5 >No Posts Found</h5>
                        </div>
                    </div>
                    <div>
                        <div class="col-12">
                            <!--  Pagination goes here  -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Form from 'vform'
import Swal from "sweetalert2";

export default {
    name: "home",
    data(){
        return{
            form: new Form({
                id: '',
                title: '',
                description: ''
            }),
            posts: [],
            modalShow: true,
        }
    },
    methods: {
        getPost(){
            axios.get('/post').then((response)=>{
                this.posts = response.data
            }).catch((error)=>{
                console.log(error)
            })
        },
        createModal(){
            this.modalShow = true;
            $('.modal').modal('show')

        },
        createPost(){
            this.form.post('/post/create').then((response)=>{
                //Load post again after creating new post
                this.getPost()
                this.modalShow = true
                //close the modal after submittng the form
                $('.modal').modal('hide')
                //Show success notification
                Toast.fire({
                    icon: 'success',
                    title: 'Post created successfully'
                })
                //Clear form after submitting
                this.resetForm()

            }).catch((error)=>{
                console.log(error)
            })
        },
        editModal(post){
            this.modalShow = false
            //show the edit modal
            $('.modal').modal('show');
            //show post in modal
            this.form.id = post.id
            this.form.title = post.title
            this.form.description = post.description

        },
        updatePost(){
            this.form.put('/post/update/' + this.form.id ).then((response)=>{
                //Load post again after creating new post
                this.getPost()
                this.modalShow = true
                //close the modal after submittng the form
                $('.modal').modal('hide')
                //Show success notification
                Toast.fire({
                    icon: 'success',
                    title: 'Post updated successfully'
                })
                //Clear form after submitting
               this.resetForm()

            }).catch((error)=>{
                console.log(error)
            })
        },
        deletePost(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                width: 400,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete('/post/delete/' + id ).then((response)=>{
                       //Reloading the posts after deleting the post
                        this.getPost()

                    }).catch((error)=>{
                        console.log(error)
                    })
                    Swal.fire(
                        'Deleted!',
                        'Post deleted successfully.',
                        'success'
                    )
                }
            })

        },
        formResetByCloseBtnHeader(){
            this.resetForm()
        },
        formResetByCloseBtnFooter(){
            this.resetForm()
        },
        resetForm(){
            this.form.id = ''
            this.form.title = ''
            this.form.description = ''
        },
    },
    mounted(){
        this.getPost()
        this.resetForm()
    }
}
</script>

<style scoped>

</style>
