<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <section>
          <h3>Import XLSX</h3>
          <input type="file" @change="onChange" />
          <xlsx-read :file="file">
            <xlsx-sheets>
              <template #default="{sheets}">
                <select v-model="selectedSheet">
                  <option v-for="sheet in sheets" :key="sheet" :value="sheet">
                    {{ sheet }}
                  </option>
                </select>
              </template>
            </xlsx-sheets>
            <xlsx-table :sheet="selectedSheet" />
            <xlsx-json :sheet="selectedSheet">
              <template #default="{collection}">
                <div>
                  {{ uploadEnd(collection) }}
                </div>
              </template>
            </xlsx-json>
          </xlsx-read>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {
  XlsxRead,
  XlsxTable,
  XlsxSheets,
  XlsxJson,
  XlsxWorkbook,
  XlsxSheet,
  XlsxDownload
} from "../node_modules/vue-xlsx/dist/vue-xlsx.es";
export default {
  components: {
    XlsxRead,
    XlsxTable,
    XlsxSheets,
    XlsxJson,
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload
  },
  computed: {
    dataParse() {
      return this.collection;
    },
    formData() {
      return this.isRequest === true ? new FormData() : new FormData();
    }
  },
  data() {
    return {
      file: null,
      selectedSheet: "Sheet1",
      sheetName: null,
      sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
      collection: [{ a: 1, b: 2 }],
      isRequest: true
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: [...this.collection] });
      this.sheetName = null;
    },
    async files(arr_files, name) {
      if (arr_files.length === 0) return false; 

      for (let [index, item] of arr_files.entries()) {
        const fetchRequest = await fetch(item);
        if (fetchRequest.status !== 200) return false;
        const blobs = await fetchRequest.blob();
        const file = new File([blobs], item.split('/').pop(), {
          type: blobs.type
        });
        this.formData.append(`files.files`, file, file.name);
      }
      return true;
    },
    async images(arr_image, name) {
      if (arr_image.length === 0) return false;
      for (let [index, item] of arr_image.entries()) {
        const fetchRequest = await fetch(item);
        if (fetchRequest.status !== 200) return false;
        const blobs = await fetchRequest.blob();
        const file = new File([blobs], name + index, {
          type: "image/jpg"
        });
        this.formData.append(`files.images`, file, file.name);
      }
      return true;
    },
    async requestObj(product) {
      this.formData.append("data", JSON.stringify(product));
        const { status, data, config } = await this.$axios.post(
          "/products",
          this.formData
        );
    },
    async uploadEnd(parse) {
      if (parse === null) return false;

      for (let [i, element] of parse.entries()) {
        this.isRequest = i;
        let readImg = "";
        let readFile = ""
        if (element.IMAGES) {
          readFile = await this.files(element.FILES.split(","), element.NAME);
          readImg = await this.images(element.IMAGES.split(","), element.NAME);
          
        } else {
          readImg = true;
          readFile = true
        }

        if (!readImg || !readFile) return false;
        this.requestObj({
          name: element.NAME,
          description: element.DESCRIPTION,
          price: element.PRICE,
          price_old: element.PRICE_OLD,
          sale: element.SALE,
          new: element.NEW,
          catalog: {
            id: Number(element.CATALOG)
          },
          catalog_element: {
            id: Number(element.CATALOG_ELEMENT)
          },
          detailed_information: element.DETAILED_INFORMATION,
          sku: element.SKU,
          count: 1,
          metaKey: element.METAKEY ? element.METAKEY : "",
          metaDescription: element.METADESCRIPTION
            ? element.METADESCRIPTION
            : "",
          characteristics: element.CHARACTERISTICS
            ? element.CHARACTERISTICS.split(";").map(item => {
                return {
                  name: item.split(",")[0],
                  value: item.split(",")[1]
                };
              })
            : [],
          filters: String(element.FILTERS)
            .split(";")
            .map(item => {
              return {
                id: Number(item)
              };
            })
        });
      }
    }
  }
};
</script>
