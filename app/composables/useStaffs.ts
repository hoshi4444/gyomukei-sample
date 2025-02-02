export type StaffItem = {
  id: number;
  name: string;
  email: string;
  position: number;
  remarks: string;
};

export const useStaffs = () => {
  const headers = [
    { title: "ID", value: "id", width: "60px" },
    { title: "氏名", value: "name", width: "200px" },
    { title: "メールアドレス", value: "email", width: "200px" },
    { title: "役職", value: "position", width: "160px" },
    { title: "備考", value: "remarks", width: "440px" },
    { title: "", value: "edit", width: "60px" },
    { title: "", value: "delete", width: "60px" },
  ];

  const staffPositionItems = [
    { value: 1, title: "部長" },
    { value: 2, title: "課長" },
    { value: 3, title: "係長" },
    { value: 4, title: "平社員" },
    { value: 5, title: "アルバイト" },
  ];

  const staffItems = ref<StaffItem[]>(
    (() => {
      const items = [];
      for (let i = 1; i <= 100; i++) {
        items.push({
          id: i,
          name: `スタッフ${i}`,
          email: `staff${i}@example.com`,
          position: (i % 3) + 1,
          remarks: "",
        });
      }
      return items;
    })()
  );

  const search = ref("");

  const selectStaff = ref<StaffItem>();
  const postDialog = ref(false);
  const editDialog = ref(false);
  const deleteDialog = ref(false);

  const snackbar = reactive({
    show: false,
    color: "error",
    text: "",
  });

  const reset = () => {
    selectStaff.value = undefined;
    postDialog.value = false;
    editDialog.value = false;
    deleteDialog.value = false;

    setTimeout(() => {
      snackbar.show = false;
      snackbar.color = "error";
      snackbar.text = "";
    }, 3000);
  };

  const cancel = () => {
    reset();
  };

  const onPost = () => {
    selectStaff.value = {
      id: Math.max(...staffItems.value.map((s) => s.id)) + 1,
      name: "",
      email: "",
      position: 1,
      remarks: "",
    };
    postDialog.value = true;
  };

  const onEdit = (item: StaffItem) => {
    selectStaff.value = item;
    editDialog.value = true;
  };

  const onDelete = (item: StaffItem) => {
    selectStaff.value = item;
    deleteDialog.value = true;
  };

  const confirmPost = (staff: StaffItem) => {
    staffItems.value.push({
      ...staff,
    });

    snackbar.show = true;
    snackbar.color = "success";
    snackbar.text = `ID: ${staff.id} のスタッフ情報を新規登録しました。`;

    reset();
  };

  const confirmEdit = (staff: StaffItem) => {
    const staffIdx = staffItems.value.findIndex((s) => s.id === staff.id);

    if (staffIdx >= 0) {
      staffItems.value.splice(staffIdx, 1, {
        ...staff,
      });
    }

    snackbar.show = true;
    snackbar.color = "success";
    snackbar.text = `ID: ${staff.id} のスタッフ情報を更新しました。`;

    reset();
  };

  const confirmDelete = (staff: StaffItem) => {
    const staffIdx = staffItems.value.findIndex((s) => s.id === staff.id);

    if (staffIdx >= 0) {
      staffItems.value.splice(staffIdx, 1);
    }

    snackbar.show = true;
    snackbar.color = "success";
    snackbar.text = `ID: ${staff.id} のスタッフ情報を削除しました。`;

    reset();
  };

  return {
    headers,
    staffItems,
    staffPositionItems,
    search,
    selectStaff,
    postDialog,
    editDialog,
    deleteDialog,
    onPost,
    onEdit,
    onDelete,
    confirmPost,
    confirmEdit,
    confirmDelete,
    cancel,
    snackbar,
  };
};
