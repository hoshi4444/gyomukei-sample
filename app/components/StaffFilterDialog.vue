<script setup lang="ts">
const emits = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const dialog = ref(false);

const route = useRoute();
const router = useRouter();

const company = ref(route.query.company ? Number(route.query.company) : null);
const department = ref(
  route.query.department ? Number(route.query.department) : null
);
const project = ref(route.query.project ? Number(route.query.project) : null);
const location = ref(
  route.query.location ? Number(route.query.location) : null
);
const workMethod = ref(
  route.query.workMethod ? Number(route.query.workMethod) : null
);
const evaluation = ref(
  route.query.evaluation ? Number(route.query.evaluation) : null
);
const education = ref(
  route.query.education ? Number(route.query.education) : null
);

watch(
  () => route.query,
  (newQuery) => {
    company.value = newQuery.company ? Number(newQuery.company) : null;
    department.value = newQuery.department ? Number(newQuery.department) : null;
    project.value = newQuery.project ? Number(newQuery.project) : null;
    location.value = newQuery.location ? Number(newQuery.location) : null;
    workMethod.value = newQuery.workMethod ? Number(newQuery.workMethod) : null;
    evaluation.value = newQuery.evaluation ? Number(newQuery.evaluation) : null;
    education.value = newQuery.education ? Number(newQuery.education) : null;
  }
);

const companyItems = ref([
  { title: "会社A", value: 1 },
  { title: "会社B", value: 2 },
  // ...other items...
]);

const departmentItems = ref([
  { title: "部署A", value: 1 },
  { title: "部署B", value: 2 },
  // ...other items...
]);

const projectItems = ref([
  { title: "プロジェクトA", value: 1 },
  { title: "プロジェクトB", value: 2 },
  // ...other items...
]);

const locationItems = ref([
  { title: "勤務地A", value: 1 },
  { title: "勤務地B", value: 2 },
  // ...other items...
]);

const workMethodItems = ref([
  { title: "リモート", value: 1 },
  { title: "オンサイト", value: 2 },
  // ...other items...
]);

const evaluationItems = ref([
  { title: "優秀", value: 1 },
  { title: "良い", value: 2 },
  // ...other items...
]);

const educationItems = ref([
  { title: "学士", value: 1 },
  { title: "修士", value: 2 },
  // ...other items...
]);

const hasFilter = computed(() =>
  Boolean(
    company.value ||
      department.value ||
      project.value ||
      location.value ||
      workMethod.value ||
      evaluation.value ||
      education.value
  )
);

const hasFilterQuery = computed(() =>
  Boolean(
    route.query.company ||
      route.query.department ||
      route.query.project ||
      route.query.location ||
      route.query.workMethod ||
      route.query.evaluation ||
      route.query.education
  )
);

const resetFilters = () => {
  company.value = null;
  department.value = null;
  project.value = null;
  location.value = null;
  workMethod.value = null;
  evaluation.value = null;
  education.value = null;
};

const confirmFilter = () => {
  dialog.value = false;

  const query: Record<string, any> = {};
  if (company.value) query.company = company.value;
  if (department.value) query.department = department.value;
  if (project.value) query.project = project.value;
  if (location.value) query.location = location.value;
  if (workMethod.value) query.workMethod = workMethod.value;
  if (evaluation.value) query.evaluation = evaluation.value;
  if (education.value) query.education = education.value;

  router.push({ path: route.path, query });

  emits("confirm");
};

const cancelFilter = () => {
  if (hasFilterQuery.value) {
    company.value = route.query.company ? Number(route.query.company) : null;
    department.value = route.query.department
      ? Number(route.query.department)
      : null;
    project.value = route.query.project ? Number(route.query.project) : null;
    location.value = route.query.location ? Number(route.query.location) : null;
    workMethod.value = route.query.workMethod
      ? Number(route.query.workMethod)
      : null;
    evaluation.value = route.query.evaluation
      ? Number(route.query.evaluation)
      : null;
    education.value = route.query.education
      ? Number(route.query.education)
      : null;
  } else {
    resetFilters();
  }

  dialog.value = false;

  emits("cancel");
};
</script>
<template>
  <v-dialog v-model="dialog" width="800" @click:outside="cancelFilter">
    <template #activator="{ props }">
      <v-badge v-model="hasFilter" color="primary" offset-x="20">
        <v-btn
          v-bind="props"
          color="primary"
          variant="outlined"
          prepend-icon="mdi-account-search"
          class="mr-4"
        >
          表示スタッフ条件変更
        </v-btn>
      </v-badge>
    </template>
    <v-card>
      <template #title> スタッフ表示条件 </template>
      <template #subtitle>
        一覧に表示するスタッフの条件を設定します。よろしければ確定するボタンを押してください。
      </template>
      <template #text>
        <div class="mb-4 d-flex align-center">
          <v-spacer />
          <v-btn
            size="small"
            prepend-icon="mdi-close"
            :disabled="!hasFilter"
            @click="resetFilters"
          >
            条件を全てクリア
          </v-btn>
        </div>
        <div>
          <v-autocomplete
            label="所属会社"
            v-model="company"
            :items="companyItems"
          />
          <v-autocomplete
            label="所属部署"
            v-model="department"
            :items="departmentItems"
          />
          <v-autocomplete
            label="所属プロジェクト"
            v-model="project"
            :items="projectItems"
          />
          <v-autocomplete
            label="勤務地"
            v-model="location"
            :items="locationItems"
          />
          <v-autocomplete
            label="勤務方法"
            v-model="workMethod"
            :items="workMethodItems"
          />
          <v-autocomplete
            label="評価"
            v-model="evaluation"
            :items="evaluationItems"
          />
          <v-autocomplete
            label="学歴"
            v-model="education"
            :items="educationItems"
          />
        </div>
        <div class="d-flex align-center">
          <ul v-if="!hasFilter" class="px-6 text-caption text-red">
            <li>条件を設定してください</li>
          </ul>
          <v-spacer />
          <v-btn variant="text" class="mr-2" @click="cancelFilter">
            キャンセル
          </v-btn>
          <v-btn
            color="primary"
            prepend-icon="mdi-check"
            :disabled="!hasFilter"
            @click="confirmFilter"
          >
            確定する
          </v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>
