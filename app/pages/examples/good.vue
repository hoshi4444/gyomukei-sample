<script lang="ts" setup>
const viewName = "良い例";

useHead({
  title: viewName,
});

const {
  staffItems,
  staffPositionItems,
  search,
  headers,
  postDialog,
  editDialog,
  deleteDialog,
  selectStaff,
  onPost,
  onEdit,
  onDelete,
  confirmPost,
  confirmEdit,
  confirmDelete,
  cancel,
  snackbar,
} = useStaffs();

const confirmFilter = () => {
  snackbar.show = true;
  snackbar.color = "success";
  snackbar.text = "スタッフの表示条件を変更しました。";

  setTimeout(() => {
    cancel();
  }, 3000);
};
</script>
<template>
  <v-container :max-width="1200">
    <div>
      <h1>スタッフ管理画面 ({{ viewName }})</h1>
    </div>
    <v-divider class="my-2" />

    <v-container>
      <v-row class="my-2" align="center">
        <h2>
          <v-icon class="mr-2"> mdi-account-group </v-icon>
          スタッフ一覧
        </h2>
        <div class="mx-4 text-caption">
          管理中のスタッフの一覧です。
          スタッフの登録や削除、スタッフ情報の更新ができます。
        </div>
        <v-spacer />

        <staff-filter-dialog @confirm="confirmFilter" />

        <v-btn color="primary" prepend-icon="mdi-account-plus" @click="onPost">
          スタッフ新規登録
        </v-btn>
      </v-row>
      <v-row>
        <v-container>
          <v-data-table-virtual
            fixed-header
            height="60vh"
            :search="search"
            :headers="headers"
            :items="staffItems"
            :filter-keys="['id', 'name', 'email']"
            no-data-text="データがありません"
          >
            <template #top="{ internalItems }">
              <v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                label="ID・氏名・メールアドレスで絞り込む"
                hide-details
                density="compact"
              />
              <div class="py-2 d-flex align-center">
                <v-spacer />
                <div>
                  {{ internalItems.length }} / {{ staffItems.length }} 件表示
                </div>
              </div>
            </template>
            <template #[`header.remarks`]>
              備考 <span class="text-caption">*入力後即更新されます</span>
            </template>
            <template #[`item.position`]="{ item }">
              <div
                v-for="(position, positionIdx) in staffPositionItems"
                :key="positionIdx"
              >
                <div v-if="position.value === item.position">
                  {{ position.title }}
                </div>
              </div>
            </template>
            <template #[`item.remarks`]="{ item }">
              <v-text-field
                v-model="item.remarks"
                density="compact"
                hide-details
                @blur="confirmEdit(item)"
              />
            </template>
            <template #[`item.edit`]="{ item }">
              <v-btn
                color="primary"
                variant="text"
                icon="mdi-pencil"
                @click="onEdit(item)"
              />
            </template>
            <template #[`item.delete`]="{ item }">
              <v-btn
                color="error"
                variant="text"
                icon="mdi-trash-can-outline"
                @click="onDelete(item)"
              />
            </template>
          </v-data-table-virtual>
        </v-container>
      </v-row>
    </v-container>

    <v-dialog v-model="postDialog" width="800">
      <v-card>
        <template #title> スタッフ新規登録 </template>
        <template #subtitle>
          入力した内容で新しくスタッフ情報を登録します。*が付いている項目は必ず入力してください。
        </template>
        <template #text>
          <staff-form
            v-if="selectStaff"
            :staff="selectStaff"
            @cancel="cancel"
            @confirm="confirmPost"
          />
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" width="800">
      <v-card>
        <template #title> スタッフ編集 </template>
        <template #subtitle>
          入力した内容でスタッフの情報を更新します。*が付いている項目は必ず入力してください。
        </template>
        <template #text>
          <staff-form
            v-if="selectStaff"
            :staff="selectStaff"
            check
            @cancel="cancel"
            @confirm="confirmEdit"
          />
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" width="800">
      <v-card>
        <template #title> スタッフ削除 </template>
        <template v-if="selectStaff" #text>
          <div>{{ selectStaff?.name }} を削除しますか？</div>

          <div class="d-flex align-center">
            <v-spacer />
            <v-btn variant="text" @click="cancel"> キャンセル </v-btn>
            <v-btn
              variant="elevated"
              color="error"
              prepend-icon="mdi-check"
              @click="confirmDelete(selectStaff)"
            >
              削除する
            </v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :text="snackbar.text"
    />
  </v-container>
</template>
