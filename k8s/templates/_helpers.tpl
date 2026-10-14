{{/* Common labels applied to every resource in this chart. */}}
{{- define "cognitive-software-delivery.labels" -}}
app.kubernetes.io/name: cognitive-software-delivery
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/part-of: cognitive-software-delivery
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version }}
{{- end -}}

{{/* Subset suitable for matchLabels / selector. */}}
{{- define "cognitive-software-delivery.selectorLabels" -}}
app.kubernetes.io/name: cognitive-software-delivery
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
