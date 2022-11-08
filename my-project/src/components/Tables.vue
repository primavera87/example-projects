<template>
  <div class="tables">
    <router-link class="button-back" to="/">Назад</router-link>
    <el-table
      :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="Название произведения"
        prop="title">
      </el-table-column>
      <el-table-column
        label="Год издания"
        prop="year">
      </el-table-column>
      <el-table-column
        label="Цена"
        prop="price">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editBook(scope.$index)">Редактировать
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="DeleteBook(scope.$index)">Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <input class="tables__input"
           v-model="newTableData.title"
            placeholder="Введите название книги">
    <input class="tables__input"
           v-model="newTableData.year"
           placeholder="Введите год издания"
    >
    <input class="tables__input"
           v-model="newTableData.price"
           placeholder="Введите цену"
    >
    <button class="tables__button" @click="addBook">{{titleButton}}</button>
  </div>
</template>

<script>
export default {
  name: "Tables",
  data() {
    return {
      tableData: [
        {
          id: 1,
          title: 'Азбука. 1 класс. В 2-х частях. Ч. 1',
          year: '2020',
          price: '654.00 руб.'
        },
        {
          id: 2,
          title: 'Азбука. 1 класс. В 2-х частях. Ч. 2',
          year: '2020',
          price: '654.00 руб.'
        },
        {
          id: 3,
          title: 'Прописи. 1 класс. В 4-х ч. Ч. 1',
          year: '2019',
          price: '200 руб.'
        },
        {
          id: 4,
          title: 'Прописи. 1 класс. В 4-х ч. Ч. 2',
          year: '2019',
          price: '200 руб.'
        }
      ],
      search: '',
      edit: false,
      newTableData: {
        id: null,
        title: null,
        year: null,
        price: null,
      }
    }
  },
  computed: {
    titleButton() {
      return !this.edit ? 'Добавить' : 'Сохранить'
    }
  },
  mounted() {
    if (localStorage.getItem('tableData')) {
      try {
        this.tableData = JSON.parse(localStorage.getItem('tableData'));
      } catch(e) {
        localStorage.setItem('tableData', this.tableData);
      }
    }
  },
  methods: {
    editBook(index) {
      let editTableData = this.tableData[index];
      this.newTableData = editTableData;
      this.edit = true;
    },
    addBook() {
      if (!this.newTableData) {
        return;
      }
      if (!this.edit) {
        this.newTableData.id = this.tableData[this.tableData.length - 1].id + 1;
        this.tableData.push(this.newTableData);
      } else {
        const index =  this.tableData.findIndex(item => item.id === this.newTableData.id)
        this.tableData[index] = this.newTableData;
      }
      this.saveBooks();
      this.newTableData = {};
    },
    DeleteBook(index) {
      this.tableData.splice(index, 1);
      this.saveBooks();
    },
    saveBooks() {
      const parsed = JSON.stringify(this.tableData);
      console.log(parsed)
      localStorage.setItem('tableData', parsed);
    }
  },
}
</script>

<style scoped>

</style>
