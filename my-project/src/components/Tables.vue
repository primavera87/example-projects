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
            @click="handleEdit(scope.$index, scope.row)">Редактировать
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="DeleteBook(scope.$index)">Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Tables",
  data() {
    return {
      tableData: [
        {
        title: 'Азбука. 1 класс. В 2-х частях. Ч. 1',
        year: '2020',
        price: '654.00 руб.'
        },
        {
          title: 'Азбука. 1 класс. В 2-х частях. Ч. 2',
          year: '2020',
          price: '654.00 руб.'
        },
        {
          title: 'Прописи. 1 класс. В 4-х ч. Ч. 1',
          year: '2019',
          price: '200 руб.'
        },
        {
          title: 'Прописи. 1 класс. В 4-х ч. Ч. 2',
          year: '2019',
          price: '200 руб.'
        }
      ],
      search: '',
    }
  },
  mounted() {
    if (localStorage.getItem('tableData')) {
      try {
        this.cats = JSON.parse(localStorage.getItem('tableData'));
      } catch(e) {
        localStorage.removeItem('tableData');
      }
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    DeleteBook(index) {
      this.tableData.splice(index, 1);
      this.saveBooks();
    },
    saveBooks() {
      const parsed = JSON.stringify(this.tableData);
      localStorage.setItem('tableData', parsed);
    }
  },
}
</script>

<style scoped>

</style>
