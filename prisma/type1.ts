interface TestInstanceVmInfo {
    changed: Boolean
    failed: Boolean
    vms: TestInstanceVmInfoVms[]
}

interface TestInstanceVmInfoVms {
    admin_username: String
    boot_diagnostics: TestInstanceVmInfoVmsBootDiagnostics
    data_disks: TestInstanceVmInfoVmsDataDisks[]
    display_status: String
    id: String
    image: TestInstanceVmInfoVmsImage
    location: String
    name: String
    network_interface_names: String[]
    os_disk_caching: String
    os_type: String
    power_state: String
    provisioning_state: String
    /// Could not determine type: the field only had null or empty values in the sample set.
    proximityPlacementGroup: JSON
    resource_group: String
    state: String
    storage_account_name: String
    storage_blob_name: String
    storage_container_name: String
    tags: TestInstanceVmInfoVmsTags
    time_stamp: String
    vm_size: String
    vm_type: String
    /// Could not determine : type: the field only had null or empty values in the sample set.
    zones?: JSON
}

interface TestInstanceVmInfoVmsBootDiagnostics {
    console_screenshot_uri?: String
    enabled: Boolean
    serial_console_log_uri?: String
    /// Multiple data types:  found: String: 7.7%, Boolean: 92.3% out of 13 sampled entries
    storage_uri?: JSON
}

interface TestInstanceVmInfoVmsDataDisks {
    caching: String
    disk_size_gb: number
    lun: number
    /// Could not determine type: the field only had null or empty values in the sample set.
    managed_disk_id: JSON
    /// Could not determine type: the field only had null or empty values in the sample set.
    managed_disk_type ?: JSON
    name              ?: String
  }

interface TestInstanceVmInfoVmsImage {
    offer: String
    publisher: String
    sku: String
    version: String
}

interface TestInstanceVmInfoVmsTags {
    ApplicationName: String
    ApplicationOwner: String
    Business: String
    Environment: String
    own_nic_: String
    own_nsg_: String
    own_pip_: String
    own_sa_: String
    environment: String
    location: String
    project: String
    zones: String
}

interface Test_Instance {
    id: String
    vm_info: TestInstanceVmInfo
}