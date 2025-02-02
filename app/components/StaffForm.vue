<script setup lang="ts">
const props = defineProps<{
  staff: StaffItem;
  check?: boolean;
}>();

const emits = defineEmits<{
  confirm: [staff: StaffItem];
  cancel: [];
}>();

const { staffPositionItems } = useStaffs();

const form = ref(false);
const name = ref(props.staff.name);
const email = ref(props.staff.email);
const position = ref(props.staff.position);
const remarks = ref(props.staff.remarks);
const isChecked = ref(false);

const confirmDisabled = computed(
  () => !name.value || !email.value || (props.check && !isChecked.value)
);
</script>
<template>
  <v-form v-model="form">
    <v-text-field v-model="name" label="氏名 *" />
    <v-text-field v-model="email" label="メールアドレス *" />
    <v-autocomplete
      label="役職"
      v-model="position"
      :items="staffPositionItems"
    />
    <v-text-field v-model="remarks" label="備考" />

    <div v-if="props.check">
      <v-divider class="my-4" />
      <v-alert type="warning" variant="text" border="left" colored-border>
        更新すると他のシステムに影響が出る場合があります。<br />
        問題無いことを確認後、以下をチェックしてから登録するボタンを押してください。
      </v-alert>
      <div class="d-flex align-center">
        <v-spacer />
        <v-checkbox
          v-model="isChecked"
          label="変更内容を確認しました"
          color="primary"
        />
        <v-spacer />
      </div>
    </div>

    <div class="d-flex align-center">
      <ul style="height: 64px" class="px-6 text-caption text-red">
        <li v-if="!name">氏名は必ず入力してください。</li>
        <li v-if="!email">メールアドレスは必ず入力してください。</li>
      </ul>
      <v-spacer />
      <v-btn variant="text" @click="emits('cancel')"> キャンセル </v-btn>
      <v-btn
        variant="elevated"
        color="primary"
        prepend-icon="mdi-check"
        :disabled="confirmDisabled"
        @click="
          emits('confirm', { id: staff.id, name, email, position, remarks })
        "
      >
        登録する
      </v-btn>
    </div>
  </v-form>
</template>
