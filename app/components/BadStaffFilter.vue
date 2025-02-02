<script setup lang="ts">
const emits = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const company = ref(null);
const department = ref(null);
const project = ref(null);
const location = ref(null);
const workMethod = ref(null);
const evaluation = ref(null);
const education = ref(null);

const cachedCompany = ref(null);
const cachedDepartment = ref(null);
const cachedProject = ref(null);
const cachedLocation = ref(null);
const cachedWorkMethod = ref(null);
const cachedEvaluation = ref(null);
const cachedEducation = ref(null);

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

const cacheFilter = () => {
  cachedCompany.value = company.value;
  cachedDepartment.value = department.value;
  cachedProject.value = project.value;
  cachedLocation.value = location.value;
  cachedWorkMethod.value = workMethod.value;
  cachedEvaluation.value = evaluation.value;
  cachedEducation.value = education.value;
};

const hasCachedFilter = computed(() =>
  Boolean(
    cachedCompany.value ||
      cachedDepartment.value ||
      cachedProject.value ||
      cachedLocation.value ||
      cachedWorkMethod.value ||
      cachedEvaluation.value ||
      cachedEducation.value
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
  cacheFilter();

  emits("confirm");
};

const cancelFilter = () => {
  if (hasCachedFilter.value) {
    company.value = cachedCompany.value;
    department.value = cachedDepartment.value;
    project.value = cachedProject.value;
    location.value = cachedLocation.value;
    workMethod.value = cachedWorkMethod.value;
    evaluation.value = cachedEvaluation.value;
    education.value = cachedEducation.value;
  } else {
    resetFilters();
  }

  emits("cancel");
};
</script>
<template>
  <v-card>
    <template #text>
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
    </template>
  </v-card>
</template>
