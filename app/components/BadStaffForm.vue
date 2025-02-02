<script setup lang="ts">
const props = defineProps({
  staff: {
    type: Object as PropType<StaffItem>,
    required: true,
  },
  add: {
    type: Boolean,
    default: false,
  },
});

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

const confirmDisabled = computed(() => !name.value || !email.value);
</script>
<template>
  <v-form v-model="form">
    <div>
      <div>氏名: {{ staff.name }}</div>
      <div>部署: 〇〇部</div>
      <div>
        役職:
        {{ staffPositionItems.find((s) => s.value === staff.position)?.title }}
      </div>
      <div>学歴: 〇〇大卒</div>
      <div>経験: 〇〇年の経験を持つ。</div>
      <div>スキル: 〇〇、〇〇、〇〇に精通。</div>
      <div>趣味: 〇〇、〇〇を楽しむ。</div>
      <div>プロジェクト: 〇〇プロジェクトに参加し、〇〇を担当。</div>
      <div>資格: 〇〇資格を保有。</div>
      <div>言語: 〇〇語、〇〇語に堪能。</div>
      <div>特技: 〇〇に優れる。</div>
      <div>自己紹介: 〇〇を目指して日々努力しています。</div>
      <div>目標: 〇〇を達成すること。</div>
      <div>プロジェクト管理: 〇〇プロジェクトの管理を担当。</div>
      <div>リーダーシップ: チームリーダーとして〇〇を指導。</div>
      <div>コミュニケーション: 優れたコミュニケーション能力を持つ。</div>
      <div>問題解決: 複雑な問題を迅速に解決。</div>
      <div>クリエイティビティ: 新しいアイデアを生み出す力。</div>
      <div>分析力: データ分析に優れる。</div>
      <div>コラボレーション: チームと協力して目標を達成。</div>
      <div>タイムマネジメント: 効果的な時間管理スキル。</div>
      <div>柔軟性: 変化に迅速に対応。</div>
      <div>自己啓発: 継続的にスキルを向上。</div>
    </div>
    <div v-if="add">
      <v-textarea v-model="remarks" label="備考" />

      <v-text-field v-model="email" label="メールアドレス *" />
      <v-autocomplete
        label="役職"
        v-model="position"
        :items="staffPositionItems"
      />

      <v-text-field v-model="name" label="氏名 *" />

      <div class="d-flex align-center">
        <v-spacer />
        <v-btn
          variant="elevated"
          color="error"
          prepend-icon="mdi-check"
          :disabled="confirmDisabled"
          @click="
            emits('confirm', { id: staff.id, name, email, position, remarks })
          "
        >
          登録する
        </v-btn>
      </div>
    </div>
    <div v-else>
      <div class="d-flex align-center">
        <v-spacer />
        <v-btn
          variant="elevated"
          color="success"
          prepend-icon="mdi-check"
          :disabled="confirmDisabled"
          @click="
            emits('confirm', { id: staff.id, name, email, position, remarks })
          "
        >
          登録する
        </v-btn>
      </div>
      <v-text-field v-model="name" label="氏名 *" />
      <v-text-field v-model="email" label="メールアドレス *" />
      <v-autocomplete
        label="役職"
        v-model="position"
        :items="staffPositionItems"
      />
      <v-text-field v-model="remarks" label="備考" />
    </div>
  </v-form>
</template>
